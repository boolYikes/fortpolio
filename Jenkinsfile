pipeline {
  agent any

  tools {
    nodejs 'nodejs'
  }

  environment {
    COMPOSE_PROJECT_NAME = "fortpolio"
    BADGE_PATH = "web/badges/build-status.svg"
  }

  stages {
    stage('01. Checkout') {
      steps {
          sshagent(['all-purpose']) {
            git branch: 'main', url: 'git@github.com:boolYikes/fortpolio.git'
          }
      }
    }

    stage('02. Debug Git') {
      steps {
        sh 'git log -1'
        sh 'git diff-tree --no-commit-id --name-only -r $GIT_COMMIT'
      }
    }

    stage('03. Prep Badge CLI') {
      steps {
        sh 'npm install -g badge-maker'
      }
    }

    stage('04. Install Dependencies') {
      steps {
        echo 'Simulate step 04'
        // dir('web/client') {
        //   sh 'npm ci'
        // }
        // dir('web/backend') {
        //   sh 'npm ci'
        // }
      }
    }

    stage('05. Run Tests') {
      steps {
        echo 'Simulate step 05'
        // dir('web/backend') {
        //   sh 'npm test'
        // }
      }
    }

    stage('06. Build and Deploy') {
      steps {
        echo 'Simulate step 06'
        // withCredentials([
        //   string(credentialsId: 'FORT_BACKEND_PORT', variable: 'FORT_BACKEND_PORT'),
        //   string(credentialsId: 'FORT_PG_HOST', variable: 'FORT_PG_HOST'),
        //   string(credentialsId: 'FORT_PG_PORT', variable: 'FORT_PG_PORT'),
        //   string(credentialsId: 'FORT_PG_USER', variable: 'FORT_PG_USER'),
        //   string(credentialsId: 'FORT_PG_PASSWORD', variable: 'FORT_PG_PASSWORD'),
        //   string(credentialsId: 'FORT_PG_DATABASE', variable: 'FORT_PG_DATABASE'),
        // ]) {
        //   sh '''
        //     echo "FORT_BACKEND_PORT=$FORT_BACKEND_PORT" > .env
        //     echo "FORT_PG_HOST=$FORT_PG_HOST" >> .env
        //     echo "FORT_PG_PORT=$FORT_PG_PORT" >> .env
        //     echo "FORT_PG_USER=$FORT_PG_USER" >> .env
        //     echo "FORT_PG_PASSWORD=$FORT_PG_PASSWORD" >> .env
        //     echo "FORT_PG_DATABASE=$FORT_PG_DATABASE" >> .env
        //     docker compose down
        //     docker compose up -d --build
        //   '''
        // }
      }
    }

    stage('07. Clean Up') {
      steps {
        echo 'Simulate step 07'
        // sh 'docker image prune -f'
      }
    }
  }

  post {
    always {
      script {
        def badgeText = currentBuild.currentResult == 'SUCCESS' ? 'build passed :brightgreen' : 'build failed :critical'

        sh "mkdir -p web/badges"
        sh "badge ${badgeText} > ${BADGE_PATH}"
        sh "git config user.name 'jenkins'"
        sh "git config user.email 'jenmcclair@hotmail.com'"

        sshagent(['all-purpose']) {
          sh """
            git add ${BADGE_PATH}
            git commit -m "Update build status badge [ci skip]" || echo "No changes to commit"
            git push origin main
          """
        }
      }
    }
  }
}
