pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t netflix-clone .'
            }
        }

        stage('Push Docker Image') {
    steps {
        bat 'docker login -u omkarpatil19 -p 9028609403'
        bat 'docker tag netflix-clone omkarpatil19/netflix'
        bat 'docker push omkarpatil19/netflix'
    }
}

        stage('Run Container') {
            steps {
                bat 'docker rm -f netflix'
                bat 'docker run -d -p 8090:80 --name netflix netflix-clone'
            }
        }
    }
}