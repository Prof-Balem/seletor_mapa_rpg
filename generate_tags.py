import os
import json

IMAGE_FOLDER = "images"
VALID_EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp")
NUMBERS = []

STOPWORDS = {
    "of", "the", "a", "an", "to", "in", "on", "at",
    "under", "over", "into", "by", "and", "through",
    "from", "with", "1", "2", "3", "4", "5"
}

SYNONYMS = {
    "temple": "religious",
    "shrine": "religious",
    "church": "religious",
    "cathedral": "religious",

    "inn": "building",
    "hotel": "building",
    "shop": "building",
    "tower": "building",
    "library": "building",
    "castle": "building",
    "cathedral": "building",
    "cabin": "building",

    "city": "urban",
    "town": "urban",
    "village": "urban",
    "port": "urban",
    "castle": "urban",

    "forest": "nature",
    "woods": "nature",
    "jungle": "nature",
    "garden": "nature",
    "canyon": "nature",

    "cave": "dungeon",
    "lair": "dungeon",
    "crypt": "dungeon",
    "tomb": "dungeon",
    "underground": "dungeon",
    "underdark": "dungeon",

    "ice": "cold",
    "lava": "fire",
    "volcano": "fire",

    "sea": "water",
    "river": "water",
    "waterfall": "water",
    "lake": "water",
    "bay": "water",

    "bridge": "structure",
    "path": "structure",
    "road": "structure",

    "abandoned": "ruins",
    "ruined": "ruins",
    "overgrown": "ruins",

    "battle": "combat",
    "attack": "combat",

    "dragon": "creature",
    "goblin": "creature",
    "harpy": "creature",
    "giant": "creature",

    "wizard": "magic",
    "druid": "magic",

    "graveyard": "undead",
    "spooky": "undead",

    "bloodborn": "bloodborn",
    "cainhurst": "bllodborn"

}

data = []

for root, dirs, files in os.walk(IMAGE_FOLDER):
    for file in files:
        if file.lower().endswith(VALID_EXTENSIONS):

            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, IMAGE_FOLDER)

            name = os.path.splitext(file)[0]
            tags = name.lower().replace("-", "_").split("_")

            # remove stopwords
            tags = [t for t in tags if t and t not in STOPWORDS]

            # aplica sinônimos
            mapped_tags = []
            for tag in tags:
                mapped_tags.append(tag)
                if tag in SYNONYMS:
                    mapped_tags.append(SYNONYMS[tag])
                # 🔥 SE NÃO TEM TAG → MARCA COMO UNTAGGED
            if not mapped_tags:
                mapped_tags = ["untagged"]
                

            # adiciona nome da pasta
            folder = os.path.basename(root)
            if folder != IMAGE_FOLDER:
                mapped_tags.append(folder.lower())

            tags = sorted(set(mapped_tags))

            data.append({
                "file": relative_path.replace("\\", "/"),
                "tags": tags
            })

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✅ data.json gerado com {len(data)} imagens!")