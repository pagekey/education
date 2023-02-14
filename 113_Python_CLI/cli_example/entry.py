import argparse

import requests


def handle_request(website, output_file):
    r = requests.get(website)
    print('Received response')
    if output_file is not None:
        with open(output_file, 'w') as f:
            f.write(r.content.decode())
        print(f'Wrote to {output_file}')

def handle_print():
    print('You can do this.')

def cli_entry_point():
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest='command')

    parser_request = subparsers.add_parser('request', help='make a request to a site')
    parser_request.add_argument('website', help='Path to website to request')
    parser_request.add_argument('-o', '--output-file', help='Where to save the requested page')
    
    parser_print = subparsers.add_parser('print', help='print a kindly message')

    args = parser.parse_args()

    if args.command == 'request':
        handle_request(args.website, args.output_file)
    elif args.command == 'print':
        handle_print()
    else:
        parser.print_help()
