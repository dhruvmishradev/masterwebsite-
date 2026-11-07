import os
import sys
import base64
import json
import urllib.request
import urllib.error

REPO = "dhruvmishradev/masterwebsite-"
TOKEN = os.environ.get("GITHUB_TOKEN") or (sys.argv[1] if len(sys.argv) > 1 else None)

if not TOKEN:
    print("ERROR: No GITHUB_TOKEN provided.")
    sys.exit(1)

FILES_TO_UPLOAD = [
    ("index.html", r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\index.html"),
    ("profile.jpg", r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\profile.jpg"),
    ("README.md", r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\README.md")
]

# Ensure README.md exists locally
readme_path = r"C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\README.md"
if not os.path.exists(readme_path):
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write("# Master Website — Dhruv Mishra\n\nProduction AI & Software Systems Developer Portfolio.\n")

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
    "User-Agent": "Antigravity-Deployer"
}

def get_file_sha(path):
    url = f"https://api.github.com/repos/{REPO}/contents/{path}"
    req = urllib.request.Request(url, headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("sha")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise

def upload_file(repo_path, local_path):
    with open(local_path, "rb") as f:
        b64_content = base64.b64encode(f.read()).decode("utf-8")
    
    sha = get_file_sha(repo_path)
    url = f"https://api.github.com/repos/{REPO}/contents/{repo_path}"
    
    payload = {
        "message": f"Add {repo_path} - Master Portfolio Website",
        "content": b64_content
    }
    if sha:
        payload["sha"] = sha
        
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="PUT")
    
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print(f"SUCCESS: Uploaded {repo_path} -> {res.get('content', {}).get('html_url')}")

for repo_path, local_path in FILES_TO_UPLOAD:
    if os.path.exists(local_path):
        print(f"Uploading {repo_path}...")
        try:
            upload_file(repo_path, local_path)
        except Exception as err:
            print(f"FAILED {repo_path}: {err}")
    else:
        print(f"SKIPPING: {local_path} not found")

print("Deployment complete!")
