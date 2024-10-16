#include "mainwindow.h"

#include <QApplication>
#include <QPushButton>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    QPushButton button("Hello world!");
    button.show();

    MainWindow w;
    w.show();
    return a.exec();
}
