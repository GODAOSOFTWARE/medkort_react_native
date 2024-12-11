//МОДЕЛЬ ДЛЯ ЗАПИСИ В ТАБЛИЦУ, хранящуюю личные данные врача
class Doctor {
    constructor(id, name, description, image, specialization, rating) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
      this.specialization = specialization;
      this.rating = rating;
    }
  }
  export default Doctor;

  