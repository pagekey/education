import requests
from requests.exceptions import ConnectionError, MissingSchema

url = input("Enter URL to download: ")
try:
	r = requests.get(url)
	print(r.status_code)

	user_continue = None
	while user_continue is None:
		raw_user_continue = input("View request body? (y/n): ")
		if raw_user_continue == 'y' or raw_user_continue == 'n':
			user_continue = raw_user_continue
	if user_continue == 'y':
		print(r.content)
	else:
		print("User chose not to print content.")
except ConnectionError:
	print("ConnectionError: unable to load that URL. Is the site down?")
except MissingSchema:
	print("MissingSchema: Is that URL valid?")
finally:
	print("Program finished.")
