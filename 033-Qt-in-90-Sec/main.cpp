#include <QApplication>
#include <QLabel>

int main(int argc, char** argv) {
	QApplication app(argc, argv);
	QLabel lblHello("<center>Hello world!</center>");
	lblHello.setWindowTitle("Hello World Qt");
	lblHello.resize(400, 400);
	lblHello.show();
	return app.exec();
}
