# desrever

'desrever' is 'reversed' backwards. Hm.

Given a file `desrever.py`:

```python
#!/usr/bin/env python3

cexe = exec
cexe(')]"}0p381o91_flnj_3ycvgyhz_av_tavferire{sgpv"==)]pni ni _ rof _ esle "9876543210_}{" ni ton _ fi ]_[d.siht[(nioj.""[)"tcerroc","gnorw"((tnirp;)" >>>"(tupni=pni;)"?galf eht si tahW"(tnirp;siht tropmi'[::-1])
```

Seems suspicious. Don't feel like running it. Instead, poke and prod that string.

First, reverse the string and split by semi-colon (semi-colons separate statements in Python):

```python
# Python (reversed.py)
command = ')]"}0p381o91_flnj_3ycvgyhz_av_tavferire{sgpv"==)]pni ni _ rof _ esle "9876543210_}{" ni ton _ fi ]_[d.siht[(nioj.""[)"tcerroc","gnorw"((tnirp;)" >>>"(tupni=pni;)"?galf eht si tahW"(tnirp;siht tropmi'[::-1]
print('Breakdown of command:')
print('\t', *command.split(';'), sep='\n\t')
```

Standard output:

```
Breakdown of command:
    import this
    print("What is the flag?")
    inp=input(">>> ")
    print(("wrong","correct")["".join([this.d[_] if _ not in "{}_0123456789" else _ for _ in inp])=="vpgs{erirefvat_va_zhygvcy3_jnlf_19o183p0}"])
```

Notice a piece of text that looks like a flag: `vpgs{erirefvat_va_zhygvcy3_jnlf_19o183p0}`

The flag is probably encrypted with a ceaser cipher. 'vpgs' maybe corresponds with 'ictf'.

```python
# Python (reversed.py)
shift = ord('v') - ord('i')

import string

def caesar(plaintext, shift):
    alphabet = string.ascii_lowercase
    shifted_alphabet = alphabet[shift:] + alphabet[:shift]
    table = str.maketrans(alphabet, shifted_alphabet)
    return plaintext.translate(table)

flag = caesar('vpgs{erirefvat_va_zhygvcy3_jnlf_19o183p0}', shift)
print()
print(f'{flag=}')
```

Standard Output:

```
flag='ictf{reversing_in_multipl3_ways_19b183c0}'
```

---

## Reflection

Pretty straightforward. Though, the flag seems to say there are many other solutions. Anyways, try `reversed.py` file for youself.