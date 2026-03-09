import {useNavigate} from "react-router-dom";

function Navbar() {
     const navigate = useNavigate();

     const image=
     localStorage.getItem("profileImage");

     const logout = ()=> {
        localStorage.removeItem("user");
        navigate("/");
     };

      return(
        <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="text-sm md:text-lg font-bold">Task Manager</h1>
            <div className="flex gap-4">
                <div
                onClick={()=> navigate("/profile")}
                className="w-8 h-8 md:10 md:h-10 rounded-full bg-white overflow-hidden flex items-center justify-center cursor-pointer"
                >
                  {image ? (
                    <img src={image} alt="profile"
                    className="w-full h-full object-cover" />
                ): (
                    <span className="text-blue-600 font-bold">P</span>
                )}
                </div>
                  <button
                onClick={logout}
                className="bg-red-500 px-2 md:px-3 py-1 rounded text-xs md:text-sm">Logout</button>
            </div>
        </div>
      );
}
 export default Navbar;