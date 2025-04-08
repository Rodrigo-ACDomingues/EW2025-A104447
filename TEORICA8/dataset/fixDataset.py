import json
import ast

with open("dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)

fields_to_convert = ["genres", "characters", "awards", "ratingsByStars", "setting"]

for book in data:
    for field in fields_to_convert:
        if field in book and isinstance(book[field], str):
            try:
                book[field] = ast.literal_eval(book[field])
            except (ValueError, SyntaxError):
                print(f"Erro ao converter {field} para o livro {book.get('title')}")

with open("dados_corrigidos.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Conversão concluída!")
