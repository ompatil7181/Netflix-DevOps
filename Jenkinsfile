pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t netflix-clone .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f netflix || true'
                sh 'docker run -d -p 8090:80 --name netflix netflix-clone'
            }
        }
    }
}