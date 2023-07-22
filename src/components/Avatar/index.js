import "./style.css";

const Avatar = () => {
    return(
        <div class="avatar-wrapper">
            <h2 class="avatar-title">옷장 탭 제목</h2>
            <div class="avatar-item">
            <img src="이미지1.jpg" alt="이미지1"/>
             <p>텍스트1</p>
          </div>
          <div class="avatar-item">
           <img src="이미지2.jpg" alt="이미지2"/>
              <p>텍스트2</p>
          </div>
    
         </div>
  )
}


export default Avatar;