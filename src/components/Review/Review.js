import React, { useState } from 'react'
import './Review.css'

const Review = (props) => {
  const [B_edit_comment, set_B_edit_comment] = useState()       // 사장 댓글 수정 state
  const [C_edit_comment, set_C_edit_comment] = useState()       // 고객 댓글 내용 수정 state
  const [C_edit_star_score, setC_edit_star_score] = useState()  // 고객 댓글 평점 수정 state
  const [B_create_comment, set_B_create_comment] = useState()   // 사장 댓글 생성 state
  const reviews = props.re
  const re_reviews = props.re_re

  const onChangeCreateComment_B = e => {
    set_B_create_comment(e.target.value)
  }
  const onChangeEditComment_B = e => {
    set_B_edit_comment(e.target.value)
  }
  const onChangeEditComment_C = e => {
    set_C_edit_comment(e.target.value)
  }
  const onChangeEditStarscore = e => {
    setC_edit_star_score(e.target.value)
  }

  var test
  test = reviews.map((review) =>
    <div className='review' id={review.id} key={review.id}>
      <ul>
        <h1>댓글</h1>
        <ul>
          {review.image &&
            <img width='300px' height='100px' src={review.image.image} alt='프로필사진못찾으면 뜨는 글' />
          }
        </ul>
        <li>댓글 id :{review.id}</li>
        <li>댓글 가게 id : {review.s_id}</li>
        <li>작성자 : {review.u_id}</li>
        <div id={`C_comment_${review.id}`} style={{ display: 'block' }}>
          <li>멘트 : {review.comment}</li>

          <li>별점 : {review.star_score}</li>
        </div>
        <div id={`C_comment_edit_${review.id}`} style={{ display: 'none' }}>
          <form id='comment_edit' onSubmit={e => {
            props.handle_C_comment_edit(e, review.id, C_edit_comment, C_edit_star_score)
            props.doEdit_C(review.id)
            set_C_edit_comment('')
            setC_edit_star_score('')
          }}>
            <li>멘트 : <textarea name='C_edit_comment' onChange={onChangeEditComment_C} value={C_edit_comment}></textarea></li>
            <li>별점 : <input type='number' min="1" max="5" name='C_edit_star_score' onChange={onChangeEditStarscore} value={C_edit_star_score}></input></li>
            <button type='submit'>수정하기</button>
          </form>
        </div>
        <li>날짜 : {review.created_at}</li>
        {props.type === 'C' &&
          <div id={`C_comment_buttons_${review.id}`} style={{ display: 'block' }}>
            <button onClick={() => { props.doEdit_C(review.id) }}>수정하기</button>
            <button onClick={(e) => { props.deleteComment(e, review.id) }}>삭제하기</button>
          </div>
        }
        {props.type === 'B' &&
          <div>
            <div id={`B_comment_create_buttons_${review.id}`} style={{ display: 'block' }}>
              <button onClick={() => { props.doCreate_B(review.id) }}>사장님 댓글 달기</button>
            </div>
            <div id={`B_comment_create_${review.id}`} style={{ display: 'none' }}>
              <form onSubmit={(e) => {
                props.handle_B_comment_create(e, B_create_comment, review.id)
                props.doCreate_B(review.id)
                set_B_create_comment('')
              }}>
                <textarea onChange={onChangeCreateComment_B} value={B_create_comment} name='B_edit_comment' rows='8' cols='60' placeholder='사장님 댓글을 달아주세요' required></textarea>
                <button type='submit'>등록하기</button>
              </form>
            </div>
          </div>
        }
        {re_reviews.map((re_review) =>
          <div key={re_review.id}>
            {review.id === re_review.r_id &&
              <ul>
                <h1>대댓글</h1>
                <li>대댓글 id :{re_review.id}</li>
                <li>해당 댓글 id : {re_review.r_id}</li>
                <li>사장님 id : {re_review.u_id}</li>
                <div id={`B_comment_edit_${re_review.id}`} style={{ display: 'none' }}>
                  <form onSubmit={e => {
                    props.handle_B_comment_edit(e, re_review.id, B_edit_comment)
                    props.doEdit_B(re_review.id)
                    set_B_edit_comment('')
                  }
                  }>
                    <li>멘트 : <input type='text' onChange={onChangeEditComment_B} value={B_edit_comment} name='B_edit_comment'></input></li>
                    <button type='submit'>수정하기</button>
                  </form>
                </div>
                <div id={`B_comment_${re_review.id}`} style={{ display: 'block' }}>
                  <li>멘트 : {re_review.comment}</li>
                </div>
                <li>날짜 : {re_review.created_at}</li>
                {props.type === 'B' &&
                  <div id={`B_comment_buttons_${re_review.id}`} style={{ display: 'block' }}>
                    <button onClick={() => { props.doEdit_B(re_review.id) }}>수정하기</button>
                    <button onClick={(e) => props.deleteReComment(e, re_review.id)}>삭제하기</button>
                  </div>
                }
              </ul>
            }
          </div>
        )}
      </ul>
    </div>
  )
  return (
    <div>
      {test}
    </div>
  );
}

export default Review;