# Custom Blender Add-Ons

To customize Blender, you'll want to start by figuring out how to add a custom panel and button to the UI. This way, you don't have to think about how to invoke all of the fancy stuff you want to do, you just need to find and press a button!

## How to Run Arbitrary Code in Blender

The first thing we need to do is figure out how to run scripts in Blender. This is fairly simple - you can follow these steps:

1. Open Blender.
2. Click any of the "New File" templates (general, video editing, etc.).
3. Click the `+` to add a workspace if there is no Scripting tab already, and select "General" > "Scripting".
4. Click the Scripting tab.
5. In the window on the right, select "Text" > "New".
6. Write or paste your script.
	- One-liner to get started: `import bpy; bpy.ops.mesh.primitive_torus_add()`
7. Select "Text" > "Run Script" (shortcut is ALT-P).
8. Voila! A donut!

## Blender Operators

Whenever you do something in Blender, from adding an object to rendering an animation, you're using operators. You can't just invoke random functions when you add a UI in Blender; you have to invoke an Operator.

Next week, we'll look at making our own operators, but for now, there's plenty that we can do with the built-in ones.

Try adding a cube in the 3D viewport, and then go to the Scripting panel. Notice anything? On the left-hand side, you should see that the `bpy.ops.mesh.primitive_cube_add` operator just got invoked. I told you so - you're using Operators already!

Now let's click into the scripting area and see what other operators are available. If you type `bpy.ops.` and then hit TAB, you should see a bunch of options come up. Keep typing - `bpy.ops.mesh.primitive` and TAB again - now you can see the primitive shapes you can add. Try adding a cone.

Another helpful shortcut is to press F3. This searches all of the available operators. If you press F3 and type "cube", you'll find the primitive cube operator.

There's one more fancy way to explore operators - you can check the "Operator Cheat Sheet". First, though, you have to enable Developer Extras. You can do this by going to Edit > Preferences > Interface > Developer Extras and checking the box.

Then, go to Help > Operator Cheat Sheet. Nothing will happen, but if you go back to the Scripting tab and click the little file folder, you'll see that you can open `OperatorList.txt` and see a couple thousand operators listed in a text document!

## Adding a Panel (Hello World)

If you check the [docs link for Blender's Panel class](https://docs.blender.org/api/current/bpy.types.Panel.html), you'll see that they provide us with a minimal example to get started:

```python
import bpy


class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world"
    bl_label = "Hello World"
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'WINDOW'
    bl_context = "object"

    def draw(self, context):
        self.layout.label(text="Hello World")

bpy.utils.register_class(HelloWorldPanel)
```

Note that it would be considered good practice to prefix your ID with `OBJECT_PT`, but since it's not required, I just used `hello_world` for simplicity.

We assign an ID, a label, a space type, region type, and context.

Run this code with ALT-P, then go to the Layout tab. On the bottom-right, hover over the icons until you find the "Object" properties panel. Click it and scroll to the bottom - you should see our Hello World panel!

## Adding a Button

Let's get right to it - we don't have to change much about our code to add a button:

```python
import bpy


class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world"
    bl_label = "Hello World"
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'WINDOW'
    bl_context = "object"

    def draw(self, context):
        self.layout.label(text="Hello World")
		self.layout.operator("mesh.primitive_cone_add", text="Add Cone")

bpy.utils.register_class(HelloWorldPanel)
```

You'll notice there's only one new line here:

```python
		self.layout.operator("mesh.primitive_cone_add", text="Add Cone")
```

Notice how rather than adding a button directly, we just add an operator to the layout, and it interprets that as meaning a button on the UI. There's no need to assign a "handler" for when the button is clicked, because the button is directly linked to the operator.

Also notice that the first argument is the same as what we'd type in the Scripting window, except for the `bpy.ops` part. So, if you wanted to do the same thing that the button does in the Scripting window, you'd type: `bpy.ops.mesh.primitive_cone_add()`

## Where is the Panel? Space, Region, Context

In the above examples, we have these magical values for `bl_space_type`, `bl_region_type` and `bl_context` that place the panel exactly where we need it, in the Object Properties area of the UI. However, what if we want to put it somewhere else? It's possible to put it just about anywhere, as we'll see in the next few examples, as long as we know how to manipulate these variables.

The best way to find out about them is to read the documentation:

  - `bl_space_type`: See [Space Type Items](https://docs.blender.org/api/current/bpy_types_enum_items/space_type_items.html#rna-enum-space-type-items)

  - `bl_region_type`: See [Region Type Items](https://docs.blender.org/api/current/bpy_types_enum_items/region_type_items.html#rna-enum-region-type-items)

  - `bl_context`: The [docs](https://docs.blender.org/api/current/bpy.types.Panel.html#bpy.types.Panel.bl_context) have a "TODO" to explain it! As we'll see, this seems to be specific to the `PROPERTIES` space.

Notice what happens if you try to change the space type:

This guy:

```python
import bpy


class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world"
    bl_label = "Hello World"
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'UI'
    bl_context = "object"

    def draw(self, context):
        self.layout.label(text="Hello World")
		self.layout.operator("mesh.primitive_cone_add", text="Add Cone")

bpy.utils.register_class(HelloWorldPanel)
```

Raises this error:

```python
Python: Traceback (most recent call last):
  File "/Text", line 15, in <module>
RuntimeError: Error: Region not found in space type
```

So, it seems that some space types only support a subset of the region types. How do we know which support which? For now, I'm going with trial and error, though I'm sure you could dig into the docs and the source code to find a more exact answer.

## Adding a Panel to View 3D

Check out this snippet, where we add a panel to the View 3D area of Blender:

```python
import bpy


class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world_3d"
    
    bl_category = "Greetings"
    bl_label = "Hello World 3D"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    #bl_context = "object"

    def draw(self, context):
        self.layout.label(text="Welcome to our custom panel.")
        self.layout.operator("mesh.primitive_cone_add", text="Add Cone")

bpy.utils.register_class(HelloWorldPanel)
```

We've made only a few simple changes:

- Changed `bl_idname` to not conflict with the other panel.
- Added `bl_category`, which is the label for the tab.
- Changed `bl_space_type` to `VIEW_3D`.
- Changed `bl_region_type` to `UI`.
- Commented out `bl_context` - it does not seem to be required for the View 3D space.

Now, if you click the Layout tab on Blender, you should be able to find this panel on the top-right of the 3D view. You may have to un-collapse the panels to see it.

## Adding a Panel to Video Sequencer

What if, rather than 3D modeling, you're trying to streamline your video editing workflow? We can create a custom Blender panel for that, too! Check it out:

```python
import bpy


class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world_vse"
    
    bl_category = "Greetings"
    bl_label = "Hello World Video Sequencer Editor"
    bl_space_type = 'SEQUENCE_EDITOR'
    bl_region_type = 'UI'

    def draw(self, context):
        self.layout.label(text="Welcome to our custom panel.")
        self.layout.operator("sequencer.scene_strip_add", text="Add scene")

bpy.utils.register_class(HelloWorldPanel)
```

The only differences are:

- Changed `bl_idname` to not conflict with the other panel.
- Changed `bl_space_type` to `SEQUENCE_EDITOR`.
- Added a VSE-specific operator.

We changed out the operator to this:

```python
        self.layout.operator("sequencer.scene_strip_add", text="Add scene")
```

That means when you click the button, a new text strip is added to the video sequence editor.

## Rewriting the Script as an Add-On

The Scripting view is great for playing around, but once we get it working how we want it to, we don't need to see all the nasty details of how it works under the hood. Instead, we can save off our script and install it as an Add-On so that Blender loads it every single time.

To do this, we just need to add a little bit of metadata and change how we're running things. Here's the full add-on code:

```python
import bpy


# The Panel
class HelloWorldPanel(bpy.types.Panel):
    bl_idname = "hello_world_vse"
    
    bl_category = "Greetings"
    bl_label = "Hello World Video Sequencer Editor"
    bl_space_type = 'SEQUENCE_EDITOR'
    bl_region_type = 'UI'
    #bl_context = "object"

    def draw(self, context):
        self.layout.label(text="Welcome to our custom panel.")
        self.layout.operator("sequencer.scene_strip_add", text="Add scene")


# Add-on Metadata    
bl_info = {
    "name": "Hello World Add-on",
    "blender": (2, 80, 0),
    "category": "Object",
}
def register():
    bpy.utils.register_class(HelloWorldPanel)
def unregister():
    bpy.utils.unregister_class(HelloWorldPanel)


# Allows you to still run this from Scripting window.
if __name__ == "__main__":
    register()
```

As you can see, the Panel code is completely unchanged. We've just tweaked a few things at the bottom:

- Added `bl_info`, which contains add-on metadata, including the earliest version of Blender that will support the add-on.
- Added the `register` function, which is called by Blender to enable your add-on.
- Added the `unregister` function, which Blender uses to turn off your add-on.
- Added a main method so that you can still run this as a script from the Scripting panel.

## Installing the Custom Add-On

Now that we've cleaned up the add-on code, let's save it off and load it as an actual Blender add-on. Follow these steps:

1. From the Scripting tab, go to Text > Save As and save your script as a `.py` file somewhere on your computer.
2. Close and reopen Blender to wipe all of the panels we created.
3. Go to `Edit` > `Preferences` > `Add-ons`.
4. Click `Install`.
5. Navigate to your `.py` file.
6. Press `Install Add-on`.
7. Check the box to make sure it's enabled.
8. Confirm it works.

## Wrap-Up

You've just gone from zero to hero in custom Blender user interfaces. You now know how to add panels and buttons in the properties window, 3D view, or video sequencer. You can add labels and buttons to perform built-in Blender operators.

The logical next step here is, of course, to implement our own operators so that we can get really fancy! Our entire workflow can be automated with the click of a button. If this sounds interesting to you, stay tuned for my next post, where we'll dive into the details of custom Blender operators.

We'll also learn about how to add text input fields and other fun controls so that we can handle more complex user input than a simple button click.

## Sources

In addition to the inline links I added throughout the article, here are some of the sources I used while researching this post. Huge thanks to the people who created this content!

- [Blender Add-On Tutorial](https://docs.blender.org/manual/en/latest/advanced/scripting/addon_tutorial.html)
- [Blender Panel Docs](https://docs.blender.org/api/current/bpy.types.Panel.html)
- [YT: Cordata - Blender Operators](https://www.youtube.com/watch?v=lq8WpPLxw1E)
- [YT: CG Python - Custom Blender Panel](https://www.youtube.com/watch?v=Qyy_6N3JV3k)
- [YT: CG Python - Custom Add-On](https://www.youtube.com/watch?v=0_QskeU8CPo)
