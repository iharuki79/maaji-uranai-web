import type React from "react";
import {useState} from "react";
import styled from "./omikuji.module.scss";
import { getTweetUrlNoLink } from "../../utils/getTweetUrl";

const omikujiList = ["大吉🤩", "吉😁", "中吉😊", "小吉😀", "末吉🙂", "凶😨", "大凶😱"];

const IndexPage = () => {
  const [ userName, setUserName ] = useState("");
  const [ resultTitle, setResultTitle ] = useState("2025年の運勢🐍");
  const [ omikujiResult, setOmikujiResult ] = useState("");
  const [ tweetUrl, setTweetUrl ] = useState(getTweetUrlNoLink("⛩まぁじ神社⛩\n", "https://uranai.hals.one/omikuji"));
  
  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>): void => setUserName(event.target.value);
  
  const salt = Number(process.env.NEXT_PUBLIC_SALT);
  const start_idx = Number(process.env.NEXT_PUBLIC_START_IDX);
  const end_idx = Number(process.env.NEXT_PUBLIC_END_IDX);

  const onClickDrawOmikuji = (): void => {
    let tmpResult = "";
    if ( userName.length === 0 ) {
      tmpResult = omikujiList[Math.floor(Math.random()*salt)%omikujiList.length];
    }
    else if ( userName === "まぁじ" || userName === "Hals_SC" || userName === "John Doe" ) {
      tmpResult = "超超超大吉！！！💪";
    } else {
      let count = salt;
      for(let i = start_idx; i < start_idx+end_idx; i++) {
        count += userName.codePointAt(i%userName.length) ?? 0;
      }
      tmpResult = omikujiList[count%omikujiList.length];
    }
    setOmikujiResult(tmpResult);
    
    const tmpTitle = `${userName.length === 0 ? "" : `${userName}さんの`}2025年の運勢🐍`;
    setResultTitle( tmpTitle );
    setTweetUrl(getTweetUrlNoLink(`⛩まぁじ神社⛩\n\n${tmpTitle}は…\n\n${tmpResult}！\n`, "https://uranai.hals.one/omikuji"));
  }

  return (
    <div className={styled.all}>
      <h1 className={styled.heading}>
        <span className={styled.emoji}>⛩</span>
        <span>まぁじ神社</span>
        <span className={styled.emoji}>⛩</span>
      </h1>
      <h2 className={styled.heading2}>おみくじ</h2>
      <div className={styled.inputArea}>
          <input
            className={styled.todoInputField}
            placeholder={"名前を入力"}
            type={"text"}
            value={userName}
            onChange={onChangeUserName}
          />
          <img className={styled.drawOmikujiButton} src="/omikuji_box.png" alt="おみくじを引く" onClick={onClickDrawOmikuji} onKeyUp={onClickDrawOmikuji}/>
      </div>
      <div className={styled.omikujiArea}>
        <h2 className={styled.heading2}>{resultTitle}</h2>
        <div className={styled.omikujiResult}>{omikujiResult}</div>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          ツイートする
        </a>
      </div>
    </div>
  );
}

export default IndexPage;