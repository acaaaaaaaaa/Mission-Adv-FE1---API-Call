import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../store/redux/userSlice';
import './ProfilePage.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);
  const isLoggedIn = useSelector(state => state.users.isLoggedIn);
  
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    password: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        username: currentUser.username || currentUser.email?.split('@')[0] || '',
        email: currentUser.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleEdit = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;


    if (isEditing.password && profileData.password !== profileData.confirmPassword) {
      setMessage('Password dan konfirmasi password tidak cocok!');
      return;
    }

    if (isEditing.password && profileData.password.length < 6) {
      setMessage('Password minimal 6 karakter!');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const updateData = {};
      
      if (isEditing.username) {
        updateData.username = profileData.username;
      }
      
      if (isEditing.email) {
        updateData.email = profileData.email;
      }
      
      if (isEditing.password) {
        updateData.password = profileData.password;
      }

      const result = await dispatch(updateUser({ userId: currentUser.id, updateData })).unwrap();
      if (result && result.userId) {
        setMessage('Profile berhasil diupdate!');
        setIsEditing({
          username: false,
          email: false,
          password: false
        });
        setProfileData(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
        
        setProfileData(prev => ({
          ...prev,
          username: result.updateData?.username || prev.username,
          email: result.updateData?.email || prev.email
        }));
      } else {
        const errorMsg = result?.error || 'Gagal mengupdate profile';
        setMessage('Gagal mengupdate profile: ' + errorMsg);
        console.error('Update profile failed:', result);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      
      if (error && !error.userId) {
        const errorMsg = error?.message || error || 'Terjadi kesalahan';
        setMessage('Gagal mengupdate profile: ' + errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePhoto = () => {
    alert('Fitur ubah foto akan segera hadir!');
  };

  const handleSubscription = () => {
    alert('Fitur berlangganan akan segera hadir!');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        setIsDeleting(true);
        await dispatch(deleteUser(currentUser.id)).unwrap();
        
        window.location.href = '/login';
      } catch (error) {
        console.error('Error deleting account:', error);
        const errorMsg = error?.message || error || 'Terjadi kesalahan';
        setMessage('Gagal menghapus akun: ' + errorMsg);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <h1>Silakan login terlebih dahulu</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profil Saya</h1>
        </div>

        <div className="profile-main">
          <div className="profile-form-section">
            <div className="profile-photo-section">
              <div className="profile-photo">
                <img 
                  src="/images/user-profile.png" 
                  alt="Profile" 
                  className="profile-avatar"
                />
              </div>
              <div className="photo-actions">
                <button 
                  className="btn-change-photo"
                  onClick={handleChangePhoto}
                >
                  Ubah Foto
                </button>
                <p className="photo-limit">Maksimal 2MB</p>
              </div>
            </div>
            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-field">
                <label>Nama Pengguna</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={!isEditing.username}
                    className={isEditing.username ? 'editing' : ''}
                  />
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => toggleEdit('username')}
                  >
                    {isEditing.username ? '✓' : '✏️'}
                  </button>
                </div>
              </div>
              <div className="form-field">
                <label>Email</label>
                <div className="input-group">
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing.email}
                    className={isEditing.email ? 'editing' : ''}
                  />
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => toggleEdit('email')}
                  >
                    {isEditing.email ? '✓' : '✏️'}
                  </button>
                </div>
              </div>
              <div className="form-field">
                <label>Kata Sandi</label>
                <div className="input-group">
                  <input
                    type="password"
                    value={profileData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={!isEditing.password}
                    placeholder={isEditing.password ? 'Masukkan password baru' : '************'}
                    className={isEditing.password ? 'editing' : ''}
                  />
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => toggleEdit('password')}
                  >
                    {isEditing.password ? '✓' : '✏️'}
                  </button>
                </div>
              </div>
              {isEditing.password && (
                <div className="form-field">
                  <label>Konfirmasi Kata Sandi</label>
                  <div className="input-group">
                    <input
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Konfirmasi password baru"
                      className="editing"
                    />
                  </div>
                </div>
              )}
              {message && (
                <div className={`message ${message.includes('berhasil') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
              <button
                type="button"
                className="btn-save"
                onClick={handleSaveProfile}
                disabled={isLoading || (!isEditing.username && !isEditing.email && !isEditing.password)}
              >
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                type="button"
                className="btn-delete-account"
                onClick={handleDeleteAccount}
                disabled={isLoading || isDeleting}
              >
                {isDeleting ? 'Menghapus...' : 'Hapus Akun'}
              </button>
            </form>
          </div>
          <div className="subscription-section">
            <div className="subscription-box">
              <div className="subscription-icon">
                <i className="fa fa-exclamation-triangle"></i>
              </div>
              <h3>Saat ini anda belum berlangganan</h3>
              <p>Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!</p>
              <button 
                className="btn-subscribe"
                onClick={handleSubscription}
              >
                Mulai Berlangganan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
