function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luong,
  _chucVu,
  _gioLam
) {
  //property
  this.tk = _taiKhoan;
  this.ten = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luong = _luong;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;

  this.xepLoai = "";

  //method
  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = this.luong * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.luong * 2;
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = this.luong * 1;
    }
  };

  this.xepLoaiNv = function () {
    var content = "";
    if (this.gioLam < 160) {
      content = "Trung Bình";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      content = " Khá";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      content = "Giỏi";
    } else {
      content = " Xuất sắc";
    }

    this.xepLoai = content;
  };
}
