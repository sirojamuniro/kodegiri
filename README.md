Cara pakai
1. buat database bernama kodegiri
2. copy folder kodegiri
3. buka terminal
4. ketik npm install
5. setelah selesai ketik npm start
6. tunggu proses syncronisasi database untuk pembuatan table sendiri
7. setelah selesai buat seeder
8. buka terminal dan ketik npx sequelize db:seed:all 
9. buat file .env bersamaan dengan env.example
10. copy semua env.example ke .env
11. untuk user bisa masuk dengan email:user@example.com password:123456
12. untuk menuju halaman admin ketik localhost:9778 untuk melihat cms dan membuat crud
13. test api swagger ke localhost:9778/documentation

berikut route yang ada

Auth User

post('api/v1/auth/login');

post('api/v1/auth/register');

Event

router.get('api/v1/event', EventController.get);
router.get('api/v1/detail', EventController.getDetail);
router.post('api/v1/'); 
router.put('api/v1/:id');
router.delete('api/v1/:id');
router.get('api/v1/:id');

nb: 1. start dan limit merupakan paginasi
contoh paginasi hanya dimulai dari 2-5 lembar maka start 2 limit 5
paginasi memakai query langsung supaya lebih cepat

2. menggunakan auth bearer di swagger: login User lalu copy token ke authorize diatas pojok kanan. masukkan copy token, selanjutnya bisa memakai Edit,Post,Delete

3. 
