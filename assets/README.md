# Assets Directory

This directory contains all the static assets used in the application, primarily images for the flashcards.

## Required Images

The application expects the following images to be present:

- apfel.png - An apple image
- hund.png - A dog image
- haus.png - A house image
- katze.png - A cat image
- buch.png - A book image

These images are loaded directly using `require()` statements in the flashcards data file.

## Image Guidelines

- For best results, use square PNG images (e.g., 512x512 pixels)
- Make sure images have transparent backgrounds if possible
- Keep file sizes small (under 100KB) for better performance
