"""Create a new, editable local animation project without overwriting files."""
import argparse
import shutil
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', type=Path, help='New directory for the video project')
    args = parser.parse_args()
    destination = args.destination.expanduser().resolve()
    if destination.exists():
        parser.error(f'Destination already exists: {destination}')
    source = Path(__file__).resolve().parents[1] / 'assets' / 'studio'
    if not (source / 'index.html').is_file():
        parser.error(f'Studio template missing: {source}')
    shutil.copytree(source, destination)
    print(f'Created editable video project: {destination}')

if __name__ == '__main__':
    main()
