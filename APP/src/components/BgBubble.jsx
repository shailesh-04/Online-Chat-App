import React from "react";
import { random } from "@utils/random";
export default function BgBubble() {
    return (
        <div className="bubbles">
            {[...Array(20)].map((_, i) => {
                let size = random(30, 130);
                return (
                    <div
                        key={i}
                        className="bubble"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${random(1, 100)}%`,
                            animationDuration: `${random(5, 11)}s`,
                            animationDelay: `${random(1, 5)}s`,
                        }}
                    ></div>
                );
            })}
        </div>
    );
}
