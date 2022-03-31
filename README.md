# 분실물 저장소 - Lost and Found



***

### 1. 프로젝트 제작 동기


항상 기업의 이익은 물론이고 아니라 잠재적 고객에게도 생산적이고 유용한 서비스를 만들어내는 개발자가 되고 싶다는 생각을 합니다. 그래서 친구를 만나면 언제나 일상 생활에서 겪는 애로사항에 대해 묻고 그것을 어떻게 개선할 수 있을지 생각하고 프로젝트 아이디어를 얻습니다. 어느날 친구가 고가의 전자 기기를 분실 했으나 찾을 방도가 없어 꽤나 애를 먹었다는 말을 했고, 그 이야기를 듣자 제가 애용하는 당근 마켓에서도 반려동물, 에어팟, 자전거 등 많은 분실물을 찾는 글이 매일 올라오던 것이 생각 났습니다. 이러한 문제들을 해결하기 위한 보편화된 분실물 관리 어플이 없다는 판단을 내렸고, 분실물 관리 어플을 만들어 누군가에게 도움이 되고자 해당 프로젝트를 제작하게 되었습니다.


***


### 2. 구현하고자 했던 기능들
+ 👤 회원제 : 누가 글을 작성 했는지, 내 어떤 글을 작성했는지 파악하기 위함
  + 로그인
  + 회원가입
  + 로그아웃
  
+ 📄 포스트 CRUD : axios 라이브러리를 사용해 api를 다루고 데이터를 다루는 역량 증명.
  + C(create) : 사용자가 글을 작성 가능하게 함.
  + R(read) : 메인 페이지 혹은 필터링 기능을 이용할 경우, 사용자가 원하는 데이터만 볼 수 있게 함.
  + U(update) : 사용자가 자신의 글을 수정할 수 있게 함
  + D(delete) : 사용자가 자신의 글을 삭제 가능하게 함.

+ 🔍 필터링 : 모든 지역의 분실물을 보여주느 것이 아니라 사용자가 원하는 지역의 데이터만 볼 수 있게 설계

+ 🔡 댓글 기능 : 글 작성자가 자신의 개인정보를 남기지 않고도 연락을 받거나 연락을 취할 수 있게 함.

+ 💬 채팅 기능 : 대화가 길어질 경우 댓글로 소통하는 것 보다 채팅 기능을 추가해서 쉽고 빠르고 사적인 대화가 가능하게 설계
 
+ 🔄 무한 스크롤 : 글 리스트를 무한정으로 보여줄 수 있게 설계.
***


### 3. 프로젝트 제작 과정 요약

- 1주차 : json-server에 연결할 임시 데이터베이스 생성 후 CRUD 구현.
- 2주차 : 회원가입, 로그인 필터링 기능 생성
- 3주차 : Node.js 서버 개발 시작. 로그인과 회원가입을 위한 api 작성.

***


### 4. 커밋 내용 정리

// 1주차
##### create header & navbar & footer
###### 모든 페이지에 디폴트로 사용될 컴포넌트인 헤더, 네비게이션 바, 그리고 푸터를 제작했습니다.


##### create tempo database and server, and fetching data using axios to Home component
###### 일시적인 데이터베이스를 data 폴더로 지정하고 데이터를 data.json에 저장. 그리고 api/posts.js 파일에서 axios를 통해 임시 서버를 localhost:5000으로 지정하고 npx json-server -p 5000 -w data/data.json 실행 시 서버 생성. Home 컴포넌트가 데이터를 받아올 수 있도록 axios.get을 통해 서버에 요청시, 서버가 데이터를 JSON 형태로 응답. 마지막으로 Home 컴포넌트를 대충 목업해서 해당 데이터가 받아지는 지 테스트.


##### fetch data from server and use to Home component
###### 서버에서 데이터를 받아와서 메인 페이지(홈 컴포넌트)에서 볼 수 있게 설계.


##### make search bar function work
###### 네비게이션 바에 위치한 검색창에 값을 입력했을 때, 입력 값을 기반으로 데이터를 필터링해서 사용자에게 보여주도록 설계. useEffect react hook을 사용했으며, 최신 글이 가장 위로 올라오도록 함. 


##### create post function using api post method
###### 새로운 글을 올릴 수 있는 /post 페이지를 생성하고, 해당 페이지에 App 컴포넌트에서 생성한 props와 함수들을 넘겨준다. 그리고 axios의 post 메소드를 통해 DB에 접근한 뒤 새로운 데이터를 생성할 수 있게 설계하고 테스트. 또한 새로운 데이터가 생성될 때마다 컴포넌트들이 데이터를 업데이트 받을 수 있게 함.


##### create delete function using api delete method
###### 글 작성자가 자신이 쓴 글을 원하면 삭제할 수 있게 설계. 로직: 특정 글을 수정하기 위해 클릭하면 해당 글의 디테일한 내용을 보여주는 페이지로 이동하고 해당 페이지에 삭제 버튼을 추가해서, 버튼을 클릭했을 때 해당 글이 DB에서 삭제됨. axios의 delete 메서드를 사용해서 데이터 삭제 api를 요청함. 

##### create edit fuction using api put method
###### 각 글의 구체적인 내용을 보여주는 디테일 페이지에 존재하는 수정하기 버튼을 누르면, 수정 페이지로 넘어가도록 설계.axios의 put 메서드 사용해서 데이터 수정.

// 1주차 끝

// 2주차
##### create sign up page and add user category to the db
###### 회원가입 페이지를 생성하고 회원가입 양식을 제출 했을 때, 서버에게 전송하고 서버가 데이터를 받아 임시 DB에 저장 가능하도록 설계. 

##### create Login page and add function compare login info from server data
###### 로그인 페이지 생성. 사용자가 로그인 할 경우, axios를 통해 서버에게 모든 유저의 정보를 요청. 서버의 응답으로 받아온 유저 리스트에서 사용자가 로그인 당시 입력한 이메일(아이디 대용)과 비밀번호와 일치하는 정보만 필터함. 그리고 로그인이 되면 자동으로 메인 페이지로 이동(useNavigate 사용). 메인 페이지로 이동할 경우 isLoggedIn의 값이 true로 바뀌어 Navbar의 구성 요소가 로그인 성공했을 경우로 바뀌도록 설계. 

##### add Logout function
##### isLoggedIn이 true인 경우, 즉 사용자가 로그인에 성공한 경우에 만약 사용자가 로그아웃 하고 싶을 때를 대비해 로그아웃 기능을 추가함. 