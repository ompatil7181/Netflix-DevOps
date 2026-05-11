pipeline {
    agent any

    stages {

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    bat '''
                    sonar-scanner ^
                    -Dsonar.projectKey=netflix ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.login=sqa_57c839ab6fffa23d849ff97b7b3c5d5c74003c5c
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
bat 'docker tag netflix-clone omkarpatil19/netflix:latest'            }
        }

        stage('Push Docker Image') {
            steps {
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