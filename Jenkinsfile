pipeline {
    agent any

    stages {

        stage('SonarQube Analysis') {
    steps {
        script {

            def scannerHome = tool 'sonar-scanner'

            withSonarQubeEnv('sonar-server') {

                bat "${scannerHome}\\bin\\sonar-scanner.bat -Dsonar.projectKey=netflix -Dsonar.sources=."

            }
        }
    }
}

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t netflix-clone .'
            }
        }

        stage('Docker Login') {
            steps {
                bat 'docker login -u omkarpatil19 -p YOUR_PASSWORD'
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker tag netflix-clone omkarpatil19/netflix:latest'
                bat 'docker push omkarpatil19/netflix:latest'
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