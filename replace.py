import os, re
count = 0
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.php'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = re.sub(r'href\s*=\s*"([^"/:?]+)\.php"', r'href="\1"', content)
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f'Updated {path}')
print(f'Done. Updated {count} files.')
