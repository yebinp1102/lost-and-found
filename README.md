# create header & navbar & footer
해당 커밋에서는 모든 페이지에 디폴트로 사용될 컴포넌트인 헤더, 네비게이션 바, 그리고 푸터를 제작했습니다.


# create tempo database and server, and fetching data using axios to Home component
해당 커밋에서는 일시적인 데이터베이스를 data 폴더로 지정하고 데이터를 data.json에 저장.
그리고 api/posts.js 파일에서 axios를 통해 임시 서버를 localhost:5000으로 지정하고 
npx json-server -p 5000 -w data/data.json 실행 시 서버 생성.
Home 컴포넌트가 데이터를 받아올 수 있도록 axios.get을 통해 서버에 요청시, 서버가 데이터를 JSON 형태로 응답. 
마지막으로 Home 컴포넌트를 대충 목업해서 해당 데이터가 받아지는 지 테스트.


# fetch data from server and use to Home component
서버에서 데이터를 받아와서 메인 페이지(홈 컴포넌트)에서 볼 수 있게 설계.


# make search bar function work
네비게이션 바에 위치한 검색창에 값을 입력했을 때, 입력 값을 기반으로 데이터를 필터링해서 사용자에게 보여주도록 설계.
useEffect react hook을 사용했으며, 최신 글이 가장 위로 올라오도록 함. 


# create post function using api post method
새로운 글을 올릴 수 있는 /post 페이지를 생성하고, 해당 페이지에 App 컴포넌트에서 생성한 props와 함수들을 넘겨준다.
그리고 axios의 post 메소드를 통해 DB에 접근한 뒤 새로운 데이터를 생성할 수 있게 설계하고 테스트.
또한 새로운 데이터가 생성될 때마다 컴포넌트들이 데이터를 업데이트 받을 수 있게 함.


# create edit function using api delete method
글 작성자가 자신이 쓴 글을 원하면 삭제할 수 있게 설계.
로직: 특정 글을 수정하기 위해 클릭하면 해당 글의 디테일한 내용을 보여주는 페이지로 이동하고 해당 페이지에 삭제 버튼을 추가해서,
버튼을 클릭했을 때 해당 글이 DB에서 삭제됨.
axios의 delete 메서드를 사용해서 데이터 삭제 api를 요청함. 