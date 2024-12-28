# Custom Blender Operators

In the last post, we saw how to write our own scripts in Blender and extend the UI with a custom panel and button. The only problem was that the button was only able to use built-in operators.

In this post, we'll make our own custom operator, which will let us implement arbitrary behavior and take full advantage of the power of Python!

## Overview

Here's a quick overview of what we'll go through. We will use project-based learning, starting with the simplest possible operator, and progressing to a second project with actual real-world use. Naturally, we'll leave some room for improvement in the next post - it would be nice to add text fields, too, but it's a little complicated!

- Project 1: Hello World Operator
	1. Just the script.
	2. Define, register operator to run script. Run via F3.
	3. Add operator to panel from previous video.
	4. Make it an add-on.
- Project 2: VSE Text Adder (Operator & Panel)

## Project 1: Hello World Operator
### 1. Just the Script

If you run the following script, you'll see every object in the scene move over just a little bit. Before we make it an operator, let's make sure that the script works by itself.

```python
import bpy

scene = bpy.context.scene
for obj in scene.objects:
    obj.location.x += 1.0
```

### 2. Define, Register Operator

Check out the [Blender Operator docs](https://docs.blender.org/api/current/bpy.types.Operator.html) for in-depth info. We'll extend `bpy.types.operator` and add two fields - `bl_idname` and `bl_label` - as well as an `execute` function to do whatever we want. Finally, we register the operator class with Blender so that it knows about it.

```python
import bpy


class HelloWorldOperator(bpy.types.Operator):
    bl_idname = "hello.world"
    bl_label = "Minimal Operator"

    def execute(self, context):
        scene = context.scene
        for obj in scene.objects:
            obj.location.x += 1.0
        return {'FINISHED'}

bpy.utils.register_class(HelloWorldOperator)
```

### 3. Add Operator to Panel

Here's the `View_3D` panel from the previous post:

```python
import bpy


class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world_3d"
    bl_category = "Greetings"
    bl_label = "Hello World 3D"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'

    def draw(self, context):
        self.layout.label(text="Welcome to our custom panel.")
        self.layout.operator("mesh.primitive_cone_add", text="Add Cone")

bpy.utils.register_class(HelloWorldPanel)
```

Now let's add our operator definition at the top, register it at the bottom, and swap from the built-in `cone_add` over to our new operator:

```python
import bpy


class HelloWorldOperator(bpy.types.Operator):
    bl_idname = "hello.world"
    bl_label = "Minimal Operator"

    def execute(self, context):
        scene = context.scene
        for obj in scene.objects:
            obj.location.x += 1.0
        return {'FINISHED'}

class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world_3d"
    bl_category = "Greetings"
    bl_label = "Hello World 3D"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'

    def draw(self, context):
        self.layout.label(text="Welcome to our custom panel.")
        self.layout.operator("hello.world", text="Slide everything")

bpy.utils.register_class(HelloWorldOperator)
bpy.utils.register_class(HelloWorldPanel)
```

Register the operator before the panel, because the panel uses the operator and needs it to be available before registration.

### 4. Make it an add-on

Just need to add the following metadata, move our register calls to the `register` function, and add `unregister` calls:

Here's the meat of it:

```python
bl_info = {
    "name": "PageKey Hello World Add-on",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
	bpy.utils.register_class(HelloWorldOperator)
	bpy.utils.register_class(HelloWorldPanel)
def unregister():
	bpy.utils.unregister_class(HelloWorldOperator)
	bpy.utils.unregister_class(HelloWorldPanel)

if __name__ == "__main__":
    register()
```


And here's the full code:

```python
import bpy


class HelloWorldOperator(bpy.types.Operator):
    bl_idname = "hello.world"
    bl_label = "Minimal Operator"

    def execute(self, context):
        scene = context.scene
        for obj in scene.objects:
            obj.location.x += 1.0
        return {'FINISHED'}


class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world_3d"
    bl_category = "Greetings"
    bl_label = "Hello World 3D"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'

    def draw(self, context):
        self.layout.label(text="Welcome to our custom panel.")
        self.layout.operator("hello.world", text="Slide everything")


bl_info = {
    "name": "PageKey Hello World Add-on",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
	bpy.utils.register_class(HelloWorldOperator)
	bpy.utils.register_class(HelloWorldPanel)
def unregister():
	bpy.utils.unregister_class(HelloWorldOperator)
	bpy.utils.unregister_class(HelloWorldPanel)

if __name__ == "__main__":
    register()
```


## Project 2: VSE Text Adder

Okay, let's do it all again from scratch to really drive home the message. Instead of sliding objects around, let's actually do something useful and add a text element to the Video Sequence Editor. If we get fancy with this, we can eventually load data from a file and populate a bunch of slides automatically.

The basic script is here - it adds a text element based on a `title` variable:

```python
import bpy


title = "my title"

vse = bpy.context.scene.sequence_editor
text_strip = vse.sequences.new_effect(
    name="auto-generated-text",
    type="TEXT",
    channel=1,
    frame_start=1,
    frame_end=30,
)
text_strip.text = title
```

Let's turn it into an operator:

```python
import bpy


class VSETextOperator(bpy.types.Operator):
    bl_idname = "vse.add_text"
    bl_label = "Add a text slide to VSE"

    def execute(self, context):
        title = "my title"
        vse = bpy.context.scene.sequence_editor
        text_strip = vse.sequences.new_effect(
            name="auto-generated-text",
            type="TEXT",
            channel=1,
            frame_start=1,
            frame_end=30,
        )
        text_strip.text = title
        return {'FINISHED'}

bpy.utils.register_class(VSETextOperator)
```

You can try it out now using F3.

Let's add it to a panel:

```python
import bpy

class VSETextPanel(bpy.types.Panel):
    bl_idname = "vse_text_panel"
    bl_category = "VSE Text"
    bl_label = "Add Slide"
    bl_space_type = 'SEQUENCE_EDITOR'
    bl_region_type = 'UI'

    def draw(self, context):
        self.layout.label(text="Welcome to the VSE panel.")
        self.layout.operator("vse.add_text", text="Add Text Slide")

bpy.utils.register_class(VSETextPanel)
```

If we tie it all together and make it an add-on, it would look like this:

```python
import bpy


class VSETextOperator(bpy.types.Operator):
    bl_idname = "vse.add_text"
    bl_label = "Add a text slide to VSE"

    def execute(self, context):
        title = "my title"
        vse = bpy.context.scene.sequence_editor
        text_strip = vse.sequences.new_effect(
            name="auto-generated-text",
            type="TEXT",
            channel=1,
            frame_start=1,
            frame_end=30,
        )
        text_strip.text = title
        return {'FINISHED'}


class VSETextPanel(bpy.types.Panel):
    bl_idname = "vse_text_panel"
    bl_category = "VSE Text"
    bl_label = "Add Slide"
    bl_space_type = 'SEQUENCE_EDITOR'
    bl_region_type = 'UI'

    def draw(self, context):
        self.layout.label(text="Welcome to the VSE panel.")
        self.layout.operator("vse.add_text", text="Add Text Slide")


bl_info = {
    "name": "PageKey VSE Text Add-on",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
	bpy.utils.register_class(VSETextOperator)
	bpy.utils.register_class(VSETextPanel)
def unregister():
	bpy.utils.unregister_class(VSETextOperator)
	bpy.utils.unregister_class(VSETextPanel)

if __name__ == "__main__":
    register()
```

Now how do we get the title field from the UI instead of hard-coding it? Turns out text fields are a bit complicated to add in Blender - we'll cover that in the next video!

## Sources
- Operator docs: https://docs.blender.org/api/current/bpy.types.Operator.html
