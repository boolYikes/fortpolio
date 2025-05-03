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
        withCredentials([
          string(credentialsId: 'FORT_BACKEND_PORT', variable: 'FORT_BACKEND_PORT'),
          string(credentialsId: 'FORT_PG_HOST', variable: 'FORT_PG_HOST'),
          string(credentialsId: 'FORT_PG_PORT', variable: 'FORT_PG_PORT'),
          string(credentialsId: 'FORT_PG_USER', variable: 'FORT_PG_USER'),
          string(credentialsId: 'FORT_PG_PASSWORD', variable: 'FORT_PG_PASSWORD'),
          string(credentialsId: 'FORT_PG_DATABASE', variable: 'FORT_PG_DATABASE'),
        ]) {
          sh '''
            echo "FORT_BACKEND_PORT=$FORT_BACKEND_PORT" > .env
            echo "FORT_PG_HOST=$FORT_PG_HOST" >> .env
            echo "FORT_PG_PORT=$FORT_PG_PORT" >> .env
            echo "FORT_PG_USER=$FORT_PG_USER" >> .env
            echo "FORT_PG_PASSWORD=$FORT_PG_PASSWORD" >> .env
            echo "FORT_PG_DATABASE=$FORT_PG_DATABASE" >> .env
            docker-compose down
            docker-compose up -d --build
          '''
        }
      }
    }

    stage('Clean Up') {
      steps {
        sh 'docker image prune -f'
      }
    }
  }
}
