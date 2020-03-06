function Logout({handleLogout}) {

    return <div className="logout">
                <span onClick={() =>  handleLogout(handleLogout)}><i className="material-icons">power_settings_new</i></span>
            </div>
}