# Start with a Python base image that uses the Alpine Linux distribution
FROM python:alpine

# Set the working directory for subsequent commands to /app
WORKDIR /app

# Copy the contents of the local directory 'GateKeeper' into the container's '/app' directory
COPY . .

# Install the dependencies listed in 'requirements.txt' using pip
RUN python -m pip install -r requirements.txt

# Expose port 6100 to the host machine
EXPOSE 5001

# Set the command to be run when the container starts, which runs the 'GateKeeper.py' file
CMD ["python", "app.py"]