export default function Page() {
    return <>
        <div className="leo">
            <div className="leo-logo">
                <img width="96" height="96"
                     src="https://www.gymnasium-weingarten.de/fileadmin/templates/gymnasium-weingarten-de/assets/img/favicon.ico"/>
            </div>
            <div className="leo-chat">
                Wird geladen...
            </div>
            <div className="leo-tooltip">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                     fill="none" stroke="#fb2c36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 8V4H8"></path>
                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                    <path d="M2 14h2"></path>
                    <path d="M20 14h2"></path>
                    <path d="M15 13v2"></path>
                    <path d="M9 13v2"></path>
                </svg>

                <div className="grow">
                    <div className="text-lg font-medium">
                        Hallo, Ich bin Leo! 🦁
                    </div>
                    <div className="text-sm">
                        Ich helfe dir gerne bei Fragen rund ums Gymnasium Weingarten
                    </div>
                </div>
            </div>
        </div>

        <script src='/integration.js'/>
    </>
}