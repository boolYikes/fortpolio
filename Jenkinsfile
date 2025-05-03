pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "fortpolio"
    BADGE_PATH = "web/badges/build-status.svg"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/boolYikes/fortpolio.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('web/client') {
          sh 'npm ci'
        }
        dir('web/backend') {
          sh 'npm ci'
        }
      }
    }

    stage('Run Tests') {
      steps {
        dir('web/backend') {
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

  post {
    success {
      steps {
        sh '''
          mkdir -p web/badges
          badge build passed :brightgreen > ${BADGE_PATH}
        '''
      }
    }

    failure {
      steps {
        sh '''
          mkdir -p web/badges
          badge build failed :critical > ${BADGE_PATH}
        '''
      }
    }

    always {
      steps {
        sh '''
          git config user.name "jenkins"
          git config user.email "jenmcclair@hotmail.com"
          git add ${BADGE_PATH}
          git commit -m "Update build status badge" || echo "No changes to commit"
          git push origin main
        '''
      }
    }
  }
}
