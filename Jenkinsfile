pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "webstack"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/boolYikes/fortpolio.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('web') {
          sh 'npm install'
        }
      }
    }

    stage('Run Tests') {
      steps {
        dir('web') {
          sh 'npm test'
        }
      }
    }

    stage('Build and Deploy') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d --build'
      }
    }
  }
}
