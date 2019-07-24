import axios from "axios";
import routes from "../../routers";

const commentNum = document.querySelector("#jsCommentNumber");
const commentList = document.querySelector("#jsCommentList");
const comment = document.querySelectorAll(".jsComment");

const decreaseNum = () => {
  commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) - 1;
};

const removeComment = (id, target) => {
  const span = target.parentElement;
  const li = span.parentElement;
  commentList.removeChild(li);
  decreaseNum();
};

const removeClick = async event => {
  const { target } = event;
  const commentId = target.id;
  const response = await axios({
    url: `${routes.api}/${commentId}/comment/delete`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (response.status === 200) {
    removeComment(commentId, target);
  }
};

const init = () => {
  comment.forEach(element => {
    const removeBtn = element.childNodes[1];
    removeBtn.addEventListener("click", removeClick);
  });
};

if (comment) {
  init();
}
