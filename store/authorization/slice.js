import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationAPI } from "../../services/authorization";

const AuthorizationSlice = createSlice({
  name: "authorization",
  initialState: {
    deleteUserId: null,
    adminRole: null,
    userRole: null,
    status: null,
    errorStatus: null,
    userId: null,
    personalInfo: null,
    usersList: [],
    oneUser: [],
    offset: 0,
    personalName: false,
    totalUsers: "",
    isAuthenticated: null,
    unblockInfo: null,
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      const { token, adminRole } = action.payload;

      state.isAuthenticated = token;
      state.adminRole = adminRole;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setUnblockInfo: (state, action) => {
      state.unblockInfo = action.payload;
    },
    setDeleteUserId: (state, action) => {
      state.deleteUserId = action.payload;
    },

    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },

    setErrorStatus: (state, action) => {
      state.errorStatus = action.payload || null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AuthorizationAPI.getUsersList.fulfilled, (state, action) => {
        const {
          data: {
            data: { data, total },
          },
        } = action.payload;

        state.usersList = data;
        state.totalUsers = total;
      })
      .addCase(AuthorizationAPI.getOneUser.fulfilled, (state, action) => {
        state.oneUser = action.payload.data.data;
      })
      .addCase(AuthorizationAPI.getPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo = action.payload.data.data;
      })

      .addCase(AuthorizationAPI.postLogin.fulfilled, (state, action) => {
        const { token, role } = action.payload.data.data;
        const { id, name } = action.payload.data.data.user;

        state.isAuthenticated = token;
        state.adminRole = role;
        state.userId = id;

        localStorage.setItem("token", token);
        localStorage.setItem("adminRole", role);
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", name);
      })

      .addCase(AuthorizationAPI.postLogin.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(AuthorizationAPI.postCreateUser.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })

      .addCase(AuthorizationAPI.postRegSubAdmin.fulfilled, (state, action) => {
        const { token, user } = action.payload.data.data;
        const { statusText } = action.payload;

        localStorage.setItem("token", token);
        localStorage.setItem("adminRole", user);
        state.status = statusText;
        state.usersList = [...state.usersList, { token, user }];
      })

      .addCase(AuthorizationAPI.postLogout.fulfilled, (state) => {
        localStorage.clear();
        state.isAuthenticated = null;
      })

      .addCase(AuthorizationAPI.putBlocked.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })

      .addCase(AuthorizationAPI.putChangeRole.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })

      .addCase(
        AuthorizationAPI.putUpdatePersonalInfo.fulfilled,
        (state, action) => {
          localStorage.setItem("userName", action.payload.data.data.user.name);
          state.status = action.payload.statusText;
        }
      )
      .addCase(
        AuthorizationAPI.putUpdateUserInfo.fulfilled,
        (state, action) => {
          state.status = action.payload.statusText;
        }
      )
      .addCase(AuthorizationAPI.putUpdateUserInfo.rejected, (state, action) => {
        state.errorStatus = action.error.message;
      })

      .addCase(AuthorizationAPI.postUnblockUser.fulfilled, (state, action) => {
        state.unblockInfo = action.payload.data.data.message;
      })
      .addCase(AuthorizationAPI.deleteAdmin.fulfilled, (state) => {
        state.status = true;
        state.usersList = state.usersList.filter(
          (item) => item.id !== state.deleteUserId
        );
      })

      .addCase(AuthorizationAPI.deleteAdmin.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const {
  setIsAuthenticated,
  setDeleteUserId,
  setUserRole,
  setUnblockInfo,
  setStatus,
  setOffset,
  setErrorStatus,
} = AuthorizationSlice.actions;

export default AuthorizationSlice;
