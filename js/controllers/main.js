//tạo đối tượng dsnv
var dsnv = new DanhSachNhanVien();

var validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

//// lấy thông tin Nhân viên
function layThongTinNhanVien(isAdd) {
  var tk = getEle("tknv").value;
  var ten = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luong = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  // check validation
  //flag
  var isValid = true; // hợp lệ
  // TK
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(tk, "tbTKNV", "(*)Vui lòng nhập Tài Khoản") &&
      validation.kiemTraDoDaiKyTu(
        tk,
        4,
        6,
        "tbTKNV",
        "Vui lòng nhập từ 4 - 6 ký tự"
      ) &&
      validation.kiemTraTrungTk(
        tk,
        "tbTKNV",
        "(*)Tài khoản đã tồn tại",
        dsnv.arr
      );
  }
  //Ten
  isValid &=
    validation.kiemTraRong(ten, "tbTen", "(*)Vui lòng nhập Tên") &&
    validation.kiemTraChuoiKyTu(ten, "tbTen", "(*)Vui lòng nhập ký tự");

  //Email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*)Vui lòng nhập Email") &&
    validation.kiemTraEmail(email, "tbEmail", "(*)Vui lòng nhập đúng dạng");

  //Mat khau
  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "(*)Vui lòng nhập Mật khẩu") &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      6,
      10,
      "tbMatKhau",
      "(*)Vui lòng nhập Mật khẩu từ 6 - 10 ký tự"
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "tbMatKhau",
      "(*)Vui lòng nhập đúng định dạng (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  //ngay lam
  isValid &= validation.kiemTraRong(ngayLam, "tbNgay", "(*)Vui lòng chọn ngày");

  //luong
  isValid &=
    validation.kiemTraRong(
      luong,
      "tbLuongCB",
      "(*)Vui lòng nhập lương cơ bản"
    ) &&
    validation.kiemTraDoDaiKyTu(
      luong,
      7,
      8,
      "tbLuongCB",
      "(*)Vui lòng nhập lương ví dụ 1.000.000"
    ) &&
    validation.kiemTraNumber(luong, "tbLuongCB", "(*)Vui lòng nhập số");

  //gio lam
  isValid &=
    validation.kiemTraRong(
      gioLam,
      "tbGiolam",
      "(*)Vui lòng nhập lương cơ bản"
    ) && validation.kiemTraNumber(gioLam, "tbGiolam", "(*)Vui lòng nhập số");
  // //chức vụ
  isValid &= validation.kiemTraChonChucVu(
    "chucvu",
    "tbChucVu",
    "(*)Vui lòng chọn chức vụ"
  );

  // //Gio lam
  // isValid &= validation.kiemTraRong(
  //   gioLam,
  //   "tbGiolam",
  //   "(*)Vui lòng nhập số giờ làm"
  // );

  if (!isValid) return;
  ////tạo đối tượng từ lớp đối tượng Nhân viên

  var nv = new NhanVien(
    tk,
    ten,
    email,
    matKhau,
    ngayLam,
    luong,
    chucVu,
    gioLam

    ////tinh tổng lương
  );
  nv.tinhTongLuong();

  nv.xepLoaiNv();
  return nv;
}

/////thêm NV
getEle("btnThemNV").onclick = function () {
  var nv = layThongTinNhanVien(true);
  if (nv) {
    dsnv.them(nv);
    //render ra bản
    renderTable(dsnv.arr);

    setLocalStorage();
  }
};

function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
<tr>
    <td> ${nv.tk} </td>
    <td> ${nv.ten} </td>
    <td> ${nv.email} </td>
   
    <td> ${nv.ngayLam} </td>
    
    <td> ${nv.chucVu} </td>
    <td> ${nv.tongLuong} </td>
    <td> ${nv.xepLoai} </td>
    <td> 
     <button class="btn btn-danger"  onclick="deleteNV('${nv.tk}')"  > Xóa NV  </button>
     <button class="btn btn-success" onclick="editNV('${nv.tk}')" data-toggle="modal" data-target="#myModal" > Sửa NV  </button>
    </td>
    
</tr>


    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

function resetForm() {
  getEle("formNv").reset();
}

/////Sửa NV
function editNV(tk) {
  var nv = dsnv.layChiTietNV(tk);
  console.log(nv);
  if (nv) {
    var title = " Nhân Viên";
    document.getElementById("header-title").innerHTML = title;

    getEle("tknv").value = nv.tk;

    ////disable sửa tk
    getEle("tknv").disabled = true;

    getEle("name").value = nv.ten;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngaySinh;
    getEle("luongCB").value = nv.luong;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
    //display nut edit
    getEle("btnCapNhat").style.display = "inline-block";
    //display nut add
    getEle("btnThemNV").style.display = "none";
  }
  function resetForm() {
    getEle("formNv").reset();
    getEle("tknv").disabled = false;
  }
}

/// Update NV
getEle("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTinNhanVien(false);
  console.log(nv);
  dsnv.capNhat(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
});

////Xóa NV
function deleteNV(tk) {
  console.log(dsnv.arr);
  dsnv.xoa(tk);
  console.log(dsnv.arr);
  renderTable(dsnv.arr);
  setLocalStorage();
}

///Tìm nv

getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiem(keyword);
  console.log(mangTimKiem);
  renderTable(mangTimKiem);
});

///lưu lại danh sách
function setLocalStorage() {
  // convert JSON ==> String
  var dataString = JSON.stringify(dsnv.arr);
  //lưu data vào local storage
  localStorage.setItem("DSNV", dataString);
}

/// xuất lại data từ localstorage

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    //convert String ==> JSON
    dsnv.arr = JSON.parse(dataString);
    renderTable(dsnv.arr);
  }
}
