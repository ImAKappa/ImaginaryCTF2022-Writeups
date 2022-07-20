import io

with io.open("emojis.txt", mode="r", encoding="utf-8") as f:
    emojis_content = f.read()

emoji_msg_bits = emojis_content.replace("👎", "0").replace("👍", "1")
# emoji_msg_bits = "0110100101100011011101000110011001111011011001010110111001100011001100000110010001101001011011100110011101011111011010010111001101011111011011100011000001110100010111110110010101101110011000110111001001111001011100000111010001101001001100000110111001011111001100010110001000110010011001010011000001100100001101000011001101111101"

print(len(emoji_msg_bits), len(emoji_msg_bits) % 8)

def bits2a(b):
    """From https://stackoverflow.com/questions/9916334/bits-to-string-python"""
    return ''.join(chr(int(''.join(x), 2)) for x in zip(*[iter(b)]*8))

emoji_msg = bits2a(emoji_msg_bits)
print(emoji_msg)

# SOLUTION: ictf{enc0ding_is_n0t_encrypti0n_1b2e0d43}