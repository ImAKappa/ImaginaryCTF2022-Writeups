import io
from pathlib import Path

with io.open(Path("emojis.txt"), mode="r", encoding="utf-8") as f:
    emojis_content = f.read()

emoji_bits = emojis_content.replace("👎", "0").replace("👍", "1")
# emoji_bits = "0110100101100011011101000110011001111011011001010110111001100011001100000110010001101001011011100110011101011111011010010111001101011111011011100011000001110100010111110110010101101110011000110111001001111001011100000111010001101001001100000110111001011111001100010110001000110010011001010011000001100100001101000011001101111101"

assert len(emoji_bits) % 8 == 0, "emojis content not grouped into bytes"

def bits2ascii(b: str) -> str:
    """From https://stackoverflow.com/questions/9916334/bits-to-string-python"""
    BITS_PER_BYTE = 8
    BASE = 2
    return ''.join(chr(int(''.join(x), BASE)) for x in zip(*[iter(b)]*BITS_PER_BYTE))

emoji_flag = bits2ascii(emoji_bits)
print("FLAG", emoji_flag)
# FLAG: ictf{enc0ding_is_n0t_encrypti0n_1b2e0d43}