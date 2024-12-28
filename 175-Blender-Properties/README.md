# Blender Properties (User Input)

So far, we've figured out how to add panels in different places within Blender and include buttons that do anything we want. But how do we get input from the user?

If we want to add other inputs to our panel, for strings, numbers, and booleans, we'll need to define Properties and PropertyGroups. In this post, we'll walk through 5 plugins, and each one will take us one step closer to having full control over user input fields in Blender.

## What are we building?

Here's a summary of each plugin and what it will teach us:

- Plugin 1: Hello World
    - Naming conventions
- Plugin 2: StringPanel
    - Simplest possible input: `StringProperty`
- Plugin 3: PropertyGroupPanel
    - `PropertyGroup`: All input types together - `int`, `float`, `str`, `bool`
- Plugin 4: 3D Text Adder
    - How to use field value when the button is clicked
- Plugin 5: VSE Text Adder
    - Putting it all together!
- Aside: How to Test Plugins

## Plugin 1: Hello World
### Plugin Naming Conventions

You can check [Plugin1_HelloWorldPanel.py](https://github.com/pagekey/education/blob/main/175-Blender-Properties/Plugin1_HelloWorldPanel.py) for the source code. It may look familiar!

This plugin is our starting point. It's almost exactly the same as the one we built in the previous post, except that it uses proper naming conventions. Notice how the class name and ID both start with `PAGEKEY_PT_`. The `PAGEKEY` piece is the name of the add-one (I went with something generic that works for all of them). The `PT` piece seems to stand for "panel type."

```python
class PAGEKEY_PT_HelloWorldPanel(bpy.types.Panel):
    bl_idname = "PAGEKEY_PT_HelloWorldPanel"
    ...
```

Other notable types are `OT` for Operators, `MT` for menus. You can read about all of these conventions [here](https://b3d.interplanety.org/en/class-naming-conventions-in-blender-2-8-python-api/). I also ran across several forums discussing this convention. If you're interested, I'll leave those links in the "Sources" section at the bottom.

## Plugin 2: StringPanel
### Adding a `StringProperty`

See [Plugin2_StringPanel.py](https://github.com/pagekey/education/blob/main/175-Blender-Properties/Plugin2_StringPanel.py) for the full source.

In this one, we do something a bit hacky. Instead of creating a custom `PropertyGroup` to hold all of our fields, we just inject the string field directly into the Scene. While this works as an MVP, it's bad practice because you'll end up with fields all over the place and no way to link them all together.

The first step is to bind the custom property to the scene directly:

```python
def register():
	...
	bpy.types.Scene.custom_text_field = bpy.props.StringProperty(
	    name="Custom Text",
	    description="A custom text field",
	    default=""
	)
```

Then, in your panel, just add it!

```python
class PAGEKEY_PT_StringPanel(bpy.types.Panel):
	...
	def draw(self, context):
		...
		self.layout.prop(context.scene, "custom_text_field")
```

This is great only if you have a single field and don't mind it being mixed in with `context.scene`, where there may be accidental name collisions with other add-ons.

Let's take a look at what we should actually be doing!

## Plugin 3: PropertyGroupPanel
### Adding a `PropertyGroup`

See [Plugin3_PropertyGroupPanel.py](https://github.com/pagekey/education/blob/main/175-Blender-Properties/Plugin3_PropertyGroupPanel.py) for the full source.

This is the right way to do things - we create our own custom class, `PAGEKEY_MyProperties`, and then we can reference it when adding the properties to the UI.

Here's the simplest possible properties class:

```python
class PAGEKEY_MyProperties(bpy.types.PropertyGroup):
    my_int: bpy.props.IntProperty()
```

Then we have to add a `PointerProperty` to bind it to the Scene during registration, which lets us access it from the panel later:

```python
def register():
	...
	bpy.utils.register_class(PAGEKEY_MyProperties)
	bpy.types.Scene.pagekey_properties = bpy.props.PointerProperty(type=PAGEKEY_MyProperties)
```

Finally, we can use the `layout.prop` method to add to the UI. Notice how the first is the PropertyGroup we'll reach into, and the second is the field we want to grab:

```python
class PAGEKEY_PT_PropertyGroupPanel(bpy.types.Panel):
	...
	def draw(self, context):
		...
		self.layout.prop(context.scene.pagekey_properties, "my_int")
```

Now you should have a working `int` input on your panel. But how do we access that value and actually do something with it? We'll see in the next example.

## Plugin 4: 3D Text Adder
### Using Values from the `PropertyGroup`

See [Plugin4_3DTextAdder.py](https://github.com/pagekey/education/blob/main/175-Blender-Properties/Plugin4_3DTextAdder.py) for the full source.

In order to use these values, we'll have to implement a custom operator. See the previous post for detailed information on how that's done.

To start, we'll add a PropertyGroup using the same steps as the previous plugin:

```python
# Define PropertyGroup
class PAGEKEY_TextProperties(bpy.types.PropertyGroup):
    title: bpy.props.StringProperty(...)

# Add to panel
class PAGEKEY_PT_TextPanel(bpy.types.Panel):
	...
	def draw(self, context):
		self.layout.prop(context.scene.pagekey_text_props, "title")

# Bind PropertyGroup to Scene
def register():
	...
	bpy.types.Scene.pagekey_text_props = bpy.props.PointerProperty(type=PAGEKEY_TextProperties)

# Unbind from Scene
def unregister():
	...
	del bpy.types.Scene.pagekey_text_props
```

Now we'll define a custom operator that adds a 3D text object:

```python
class PAGEKEY_OT_TextOperator(bpy.types.Operator):
	...
	def execute(self, context):
		scene = context.scene
		text_body = scene.pagekey_text_props.title
		# see link to full code for steps to add text
```

The steps to add text are a bit long, so they're omitted from the snippet. But check it out - we were able to refer to the value of our integer field using `context.scene.pagekey_text_props`, the same variable we bound to in the `register` method! It's as easy as that.

## Plugin 5: VSE Text Adder
### Putting It All Together

See [Plugin5_VSETextAdder.py](https://github.com/pagekey/education/blob/main/175-Blender-Properties/Plugin5_VSETextAdder.py) for the full source.

This is an attempt at an actually-useful plugin. It shows how we can expose all sorts of different fields - one of every type that I know of - and use them all together, like an orchestra, to do a specific task when a button is clicked.

Conceptually, there's nothing new here compared to the previous four plugins, so I'd recommend checking out the full source code to see how all the pieces fit together into something useful.

## Testing Plugins

I tested the plugins above thoroughly before including them in this article/video, because it would have been a huge pain to update them after the fact. I settled on the following rough procedure:

1. Write the plugin, with register/unregister/bl_info.
2. Run it in Scripting to make sure it works.
3. Save to .py file.
4. Load the plugin, check the box, try it out.
5. MAKE SURE YOU CAN UNCHECK THE PLUGIN! (without errors)
6. Re-check, make sure it still works.
7. Remove the plugin.

Can we automate this with CI/CD? Probably!

In fact, I'd think that anyone maintaining a Blender add-on themselves would want to set something up to run this automatically for them. It's possible to install Blender in a Docker image and run it headless, giving you full access to the `bpy` API, so this should, theoretically, be totally doable! But "should" is always the operative word. :)

## That's it! 

Here's a quick recap.

- Learned how to add string, int, float, bool inputs in Blender.
- Build 5 plugins.
- Learned about plugin naming conventions.
- Learned how to test plugins.

Subscribe to Take Back Tech! See [@PageKey](https://youtube.com/@PageKey) on YouTube.

- Re-building things from scratch
- Self-Hosting
- And more!

## Sources

- Good properties docs
	- https://docs.blender.org/api/current/bpy.props.html
- SO Answer on adding text props:
	- https://blender.stackexchange.com/questions/203000/how-to-create-text-input-field-with-blender-python-api
- Naming convention sources:
	- https://b3d.interplanety.org/en/class-naming-conventions-in-blender-2-8-python-api/
	- https://blender.stackexchange.com/questions/124095/what-do-new-bpy-class-naming-conventions-in-blender-2-80-actually-mean
	- https://blender.stackexchange.com/questions/212951/bl-idname-convention
