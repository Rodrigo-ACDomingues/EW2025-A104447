import re

def fix_json(file_path, output_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Corrigir os elementos dentro dos arrays para ter as aspas duplas corretamente
    content = re.sub(r"\[(.*?)\]", 
                     lambda m: "[" + ", ".join(f'"{x.strip().strip("\'").strip("\"")}"' 
                                               for x in m.group(1).split(",")) + "]", 
                     content)

    # Outras correções de escape de aspas
    content = re.sub(r'\\"', '"', content)
    content = re.sub(r'\\",', '\\""', content)
    content = re.sub(r'""', '"', content)
    content = re.sub(r': ",', ': "",', content)
    content = re.sub(r': "\s+\}', ': ""\n\t}', content)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Arquivo corrigido salvo em: {output_path}")

input_file = "dataset.json"
output_file = "dataset_fixed.json"

fix_json(input_file, output_file)
