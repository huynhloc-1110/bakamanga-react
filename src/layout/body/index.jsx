import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Report from "../../pages/admin/manageReport";
import About from "../../pages/about";
import Error from "../../pages/error/error404";
import Manga from "../../pages/manga/mangaOptions";
import MangaDetail from "../../pages/manga/mangaDetails";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import ManageUser from "../../pages/admin/manageUser";
import ManageManga from "../../pages/admin/manageManga";
import Home from "../../pages/home";
import ManageCategory from "../../pages/admin/manageCategory";
import ManageAuthor from "../../pages/admin/manageAuthor";
import ChapterPage from "../../pages/manga/chapter";
import Profile from "../../pages/profile";
import Upload from "../../pages/upload/createChapter";
import ManageChapter from "../../pages/upload/manageChapter";
import Edit from "../../pages/upload/editChapter";
import Group from "../../pages/groupProfile";
import MangaListGroup from "../../pages/profile/components/MangaListGroup";

export default function Body() {
  return (
    <div id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage/Manga" element={<ManageManga />} />
        <Route path="/manage/User" element={<ManageUser />} />
        <Route path="/manage/report" element={<Report />} />
        <Route path="/manage/Category" element={<ManageCategory />} />
        <Route path="/manage/Author" element={<ManageAuthor />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Manga/:mangaId" element={<MangaDetail />} />
        <Route path="/Manga" element={<Manga />} />
        <Route path="*" element={<Error />} />
        <Route path="/Chapter/:chapterId" element={<ChapterPage />} />
        <Route path="/Profile/:userId" element={<Profile />} />
        <Route path="/Upload/:mangaId" element={<Upload />} />
        <Route path="/Upload/Edit/:chapterId" element={<Edit />} />
        <Route path="/upload/chapter" element={<ManageChapter />} />
        <Route path="/Group/:groupId" element={<Group />} />
        <Route path="/Mangalist" element={<MangaListGroup />} />
      </Routes>
    </div>
  );
}
