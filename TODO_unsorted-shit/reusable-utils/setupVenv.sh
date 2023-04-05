# Check if current directory has env or venv folder and it contains files, if so, echo "You have already set up virtualenv!", if not, set up virtualenv with python3
# Then activate virtualenv and install requirements.txt
# Then deactivate virtualenv
# Then echo "Virtualenv is set up successfully!"

# Check if current directory has env or venv folder and it contains files
if [ -d "env" ] && [ "$(ls -A env)" ]; then
    echo "You have already set up virtualenv!"
elif [ -d "venv" ] && [ "$(ls -A venv)" ]; then
    echo "You have already set up virtualenv!"
else
    # Set up virtualenv with python3
    python3 -m venv env
    # Activate virtualenv
    source env/bin/activate
    # Install requirements.txt
    pip install -r requirements.txt
    # Deactivate virtualenv
    deactivate
    # Echo "Virtualenv is set up successfully!"
    echo "Virtualenv is set up successfully!"
fi