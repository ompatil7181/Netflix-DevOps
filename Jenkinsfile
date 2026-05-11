pipeline {
    agent any

    stages {

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'

                    withSonarQubeEnv('sonar-server') {

                        bat """
                        ${scannerHome}\\bin\\sonar-scanner.bat ^
                        -Dsonar.projectKey=netflix ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        -Dsonar.exclusions=node_modules/**,dist/**,.scannerwork/**,.git/**
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t netflix-clone .'
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