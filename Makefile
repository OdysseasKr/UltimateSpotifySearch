TARGET = ultimatespotifysearch.zip

all:
	cd src && zip -r ../$(TARGET) *
clean:
	rm $(TARGET)
