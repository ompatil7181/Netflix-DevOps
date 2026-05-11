pipeline {
    agent any

    stages {

       stage('SonarQube Analysis') {
    steps {
        script {
            def scannerHome = tool 'sonar-scanner'

            withSonarQubeEnv('sonar-server') {

                bat """
                set SONAR_SCANNER_OPTS=-Xmx256m
                set JAVA_OPTS=-Xmx256m

                ${scannerHome}\\bin\\sonar-scanner.bat ^
                -Dsonar.projectKey=netflix ^
                -Dsonar.sources=. ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.exclusions=node_modules/**,dist/**,.scannerwork/**,.git/**,coverage/**,*.log ^
                -Dsonar.text.inclusions=NONE ^
                -Dsonar.javascript.node.maxspace=256
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

        stage('Docker Login') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
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
                bat 'docker rm -f netflix || exit 0'
                bat 'docker run -d -p 8090:80 --name netflix netflix-clone'
            }
        }
    }
}