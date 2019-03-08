echo "prepare release ......"
echo "spoc-portal-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git pull
git merge develop
git push
cd src/component/spoc-choiceschool-web
echo "spoc-choiceschool-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git merge develop
git push
cd ../spoc-core-web
echo "spoc-core-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git pull
git merge develop
git push
cd ../spoc-docu-web
echo "spoc-docu-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git pull
git merge develop
git push
cd ../spoc-library-web
echo "spoc-library-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git pull
git merge develop
git push
cd ../spoc-plan-web
echo "spoc-plan-web"
git stash
git checkout dev
git pull
git checkout release/2.0.0
git pull
git merge dev
git push
cd ../spoc-sign-web
echo "spoc-sign-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git pull
git merge develop
git push
cd ../spoc-crm-web
echo "spoc-crm-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git pull
git merge develop
git push
cd ../spoc-apply-web
echo "spoc-apply-web"
git stash
git checkout develop
git pull
git checkout release/2.0.0
git pull
git merge develop
git push

echo "start release version ......"
cd ../../../
nohup npm run build &

echo "end release version ......"
echo "spoc-portal-web"
git checkout develop
git stash pop
cd src/component/spoc-choiceschool-web
echo "spoc-choiceschool-web"
git checkout develop
git stash pop
cd ../spoc-core-web
echo "spoc-core-web"
git checkout develop
git stash pop
cd ../spoc-docu-web
echo "spoc-docu-web"
git checkout develop
git stash pop
cd ../spoc-library-web
echo "spoc-library-web"
git checkout develop
git stash pop
cd ../spoc-plan-web
echo "spoc-plan-web"
git checkout dev
git stash pop
cd ../spoc-sign-web
echo "spoc-sign-web"
git checkout develop
git stash pop
cd ../spoc-crm-web
echo "spoc-crm-web"
git checkout develop
git stash pop
cd ../spoc-apply-web
echo "spoc-apply-web"
git checkout develop
git stash pop

