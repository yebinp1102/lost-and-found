# create header & navbar & footer
해당 커밋에서는 모든 페이지에 디폴트로 사용될 컴포넌트인 헤더, 네비게이션 바, 그리고 푸터를 제작했습니다.

# create tempo database and server, and fetching data using axios to Home component
해당 커밋에서는 일시적인 데이터베이스를 data 폴더로 지정하고 데이터를 data.json에 저장.
그리고 api/posts.js 파일에서 axios를 통해 임시 서버를 localhost:5000으로 지정하고 
npx json-server -p 5000 -w data/data.json 실행 시 서버 생성.
Home 컴포넌트가 데이터를 받아올 수 있도록 axios.get을 통해 서버에 요청시, 서버가 데이터를 JSON 형태로 응답. 
마지막으로 Home 컴포넌트를 대충 목업해서 해당 데이터가 받아지는 지 테스트.