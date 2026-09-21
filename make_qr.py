#!/usr/bin/env python3
"""Create a high-resolution Pick Your Poison QR PNG after deployment."""

import sys
from pathlib import Path
import qrcode
from qrcode.constants import ERROR_CORRECT_M


def main():
    if len(sys.argv) != 2:
        print('Usage: python3 make_qr.py "https://your-final-url.example/"')
        raise SystemExit(2)

    url = sys.argv[1].strip()
    if not url.startswith(('https://', 'http://')):
        print('Please provide the complete website URL beginning with https://')
        raise SystemExit(2)

    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_M,
        box_size=24,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', back_color='white')
    out = Path('pick-your-poison-qr.png')
    img.save(out)
    print(f'Created: {out.resolve()}')


if __name__ == '__main__':
    main()
