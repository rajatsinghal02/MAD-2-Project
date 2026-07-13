import requests
url = "http://127.0.0.1:8080/api/auth/login"
r = requests.post(url, json={"email": "admin@ppa.com", "password": "admin"})
token = r.json().get("token")
print("Token:", token)
headers = {"Authorization": f"Bearer {token}"}
r2 = requests.get("http://127.0.0.1:8080/api/admin/companies", headers=headers)
print("Status:", r2.status_code)
print("Response:", r2.text)
