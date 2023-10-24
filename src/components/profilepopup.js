import React from "react";
import './styles.css';
import { onLogout } from "../Api/AuthApi";
export default function ProfilePopup(){
    return(
        <div className="popup-card">
        <p className="name">{currentUser?.name}</p>
        <p className="headline">{currentUser?.headline}</p>
        <Button
          title="View Profile"
          onClick={() =>
            navigate("/profile", {
              state: {
                id: currentUser?.id,
              },
            })
          }
        />
        <Button title="Log out" onClick={onLogout} />
      </div>
    )
}