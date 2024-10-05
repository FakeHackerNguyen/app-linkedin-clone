export function templateNotification(to: string, reason: string): string {
  return `<div
      style="
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        font-family: sans-serif;
      "
    >
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
          margin-top: 50px;
        "
      >
        <img
          src="https://res.cloudinary.com/myshop-it/image/upload/v1708186379/logo_ollsvf.png"
          width="93"
          height="35"
        />
          ${to}      
      </header>
      <main
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: left;
        "
      >
        <div>
          <h1
            style="
              padding: 0;
              margin: 0;
              color: #000000;
              font-weight: 500;
              font-size: 24px;
              line-height: 1.333;
            "
          >
            ${reason}
          </h1>
        </div>
      </main>
    </div>`;
}
export function templateOTP(to: string, otp: string, reason: string) {
  return `
  <div
      style="
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        font-family: sans-serif;
      "
    >
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
          margin-top: 50px;
        "
      >
        <img
          src="https://res.cloudinary.com/myshop-it/image/upload/v1708186379/logo_ollsvf.png"
          width="93"
          height="35"
        />
          ${to}      
      </header>
      <main
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: left;
        "
      >
        <div>
          <h1
            style="
              padding: 0;
              margin: 0;
              color: #000000;
              font-weight: 500;
              font-size: 24px;
              line-height: 1.333;
            "
          >
            ${reason}
          </h1>
          <p
            style="
              padding-top: 16px;
              margin: 0;
              color: rgba(0, 0, 0, 0.9);
              font-weight: 400;
              font-size: 16px;
              line-height: 1.25;
            "
          >
           Enter this code to confirm
          </p>
          <p
            style="
              padding-top: 16px;
              margin: 0;
              color: #5a6b51;
              font-weight: 500;
              letter-spacing: 1.5px;
              font-size: 32px;
              text-align: center;
            "
          >
            ${otp}
          </p>
        </div>
      </main>
    </div>`;
}
