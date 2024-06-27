import PageContainer from "./components/PageContainer";
import ProfilePage from 'pages/profile'
import ProfileProvider from "../pages/profile/providers/ProfileProvider";

const Profile = (props) => {

    return (
        <PageContainer>
            <ProfileProvider>
                <ProfilePage {...props}/>
            </ProfileProvider>
        </PageContainer>
    )
}
export default Profile;